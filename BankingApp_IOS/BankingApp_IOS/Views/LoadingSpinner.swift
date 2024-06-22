//
//  LoadingSpinner.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 17.06.24.
//

import SwiftUI

struct LoadingSpinner: View {
    
    var body: some View {
        ZStack {
            Color(.systemBackground)
            
            VStack {
                Spacer()
                ProgressView("Loading...")
                    .progressViewStyle(CircularProgressViewStyle(tint: .blue))
                    .padding()
                Spacer()
            }
            
        }
    }
}

#Preview {
    LoadingSpinner()
}
