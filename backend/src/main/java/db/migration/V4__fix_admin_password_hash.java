package db.migration;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.PreparedStatement;

/**
 * V4: ensure the seed admin password hash is correctly recognized
 * by BCryptPasswordEncoder.
 *
 * Why this exists:
 *  The hash baked into V3__seed_data.sql came from an external source and
 *  did NOT actually match "changeme123" when checked against our own
 *  BCryptPasswordEncoder. Instead of trying to copy/paste another
 *  pre-computed hash (and risk the same mismatch), we generate the hash
 *  here in Java with the exact same encoder used by AuthService at runtime.
 *  This guarantees correctness.
 *
 * Flyway picks up classes named V<n>__*.java under the db.migration package
 * automatically (just like SQL files).
 */
public class V4__fix_admin_password_hash extends BaseJavaMigration {

    private static final String DEFAULT_PASSWORD = "changeme123";

    @Override
    public void migrate(Context context) throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
        String correctHash = encoder.encode(DEFAULT_PASSWORD);

        String sql = "UPDATE admin_users SET password_hash = ? WHERE username = 'admin'";
        try (PreparedStatement ps = context.getConnection().prepareStatement(sql)) {
            ps.setString(1, correctHash);
            ps.executeUpdate();
        }
    }
}
